import * as vscode from 'vscode';
import ua from 'universal-analytics';
import osName from 'os-name';
import publicIp from 'public-ip';
import { getExtensionInfo } from './utils';

export interface Telemetry {
  sendEvent(eventName: string, eventValue?: any): void;
  isTelemetryEnabled(): boolean;
}

/**
 * A NoOp implementation of telemetry
 */
export class NoOpTelemetry implements Telemetry {
  /**
   * NoOp implementation of sending a telemetry event
   * @param eventName Name of the event that occurred
   * @param eventValue Optional value of the event
   */
  sendEvent(eventName: string, eventValue?: any) {
    return;
  }

  /**
   * NoOp implementation of identifying if telemetry is enabled
   */
  isTelemetryEnabled(): boolean {
    return true;
  }
}

/**
 * A local implementation of telemetry to use during 
 * debug sessions
 */
export class LocalTelemetry implements Telemetry {

  /**
   * Records telemetry to the debug console
   * @param eventName Name of the event that occurred
   * @param eventValue Optional value of the event
   */
  sendEvent(eventName: string, eventValue?: any) {
    console.log('[TelemetryEvent] %s: %s', eventName, eventValue);
  }

  /**
   * NoOp implementation of identifying if telemetry is enabled
   */
  isTelemetryEnabled() {
    return true;
  }
}

/**
 * Google Auth Implementation of Telemetry
 */
export class GoogleAnalyticsTelemetry implements Telemetry {
  private static INSTANCE: GoogleAnalyticsTelemetry;

  client: any;
  userId: string;
  ip: string;
  private _isTelemetryEnabled: boolean;

  private constructor() {
    this.userId = vscode.env.machineId;
    this.ip = '';
    this._isTelemetryEnabled = this.areAllTelemetryConfigsEnabled();
    this.setup();
    vscode.workspace.onDidChangeConfiguration(this.configurationChanged, this);
  }

  /**
   * Retrieves the current instance of the telemetry object
   */
  public static getInstance(): Telemetry {
    if (!GoogleAnalyticsTelemetry.INSTANCE) {
      GoogleAnalyticsTelemetry.INSTANCE = new GoogleAnalyticsTelemetry();
    }

    return GoogleAnalyticsTelemetry.INSTANCE;
  }

  /**
   * Returns whether both global & Vonage specific
   * telemetry settings are enabled
   */
  isTelemetryEnabled(): boolean {
    return this.areAllTelemetryConfigsEnabled();
  }

  /**
   * 
   */
  async setup(): Promise<void> {

    /**
     * If the user has opted out of sending telemetry
     * there's no need to continue.
     */
    if (!this.isTelemetryEnabled) {
      return;
    }

    if (this.client) {
      return;
    }

    this.client = ua('G-K22ZDJ2C5Y');

    const extensionInfo = getExtensionInfo();

    /**
     * Store
     */
    this.ip = await publicIp.v4();

    /**
     * User custom dimensions to store user metadata
     */
    this.client.set('cd1', vscode.env.sessionId);
    this.client.set('cd2', vscode.env.language);
    this.client.set('cd3', vscode.version);
    this.client.set('cd4', osName());
    this.client.set('cd5', extensionInfo.version);

    /**
     * Set userID
     */
    this.client.set('uid', this.userId);
  }

  /**
   * Records event to telemetry 
   * @param eventName Name of the event that occurred 
   * @param eventValue Optional value of the event
   */
  sendEvent(eventName: string, eventValue?: any): void {
    if (!this.isTelemetryEnabled) {
      return;
    }

    const requestParams = {
      eventCategory: 'All',
      eventAction: eventName,
      eventValue: eventValue,
      uip: this.ip,
      uid: this.userId,
    };

    this.client.event(requestParams).send();
  }

  /**
   * Handles setting up telemetry if the user enabled it
   * @param configurationChangeEvent Event fired when a configuration option has changed in VS Code
   */
  private configurationChanged(configurationChangeEvent: vscode.ConfigurationChangeEvent): void {
    this._isTelemetryEnabled = this.areAllTelemetryConfigsEnabled();
    if (this._isTelemetryEnabled) {
      this.setup();
    }
  }

  /**
   * Respect both the overall and Vonage-specific telemetry configs
   */
  private areAllTelemetryConfigsEnabled(): boolean {
    const enableTelemetry = vscode.workspace
      .getConfiguration('telemetry')
      .get('enableTelemetry', false);
    const vonageEnableTelemetry = vscode.workspace
      .getConfiguration('vonage.telemetry')
      .get('enabled', false);
    return enableTelemetry && vonageEnableTelemetry;
  }
}
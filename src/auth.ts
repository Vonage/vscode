import * as vscode from 'vscode';
import * as keytartype from 'keytar';
import { Credentials } from './models';
import fs from "fs";
import path from "path";
import ini from "ini";

declare const __webpack_require__: typeof require;
declare const __non_webpack_require__: typeof require;

export enum KeytarKeys {
  /** Service name */
  service = 'vonage',

  /** Key for API key */
  apiKey = 'apiKey',

  /** Key for API secret */
  apiSecret = 'apiSecret',
}

const authStatusEventEmitter = new vscode.EventEmitter<Credentials>();

export class Auth {

  public static onAuthStatusChanged = authStatusEventEmitter.event;

  private static validateCredentials = async (apiKey?: string, apiSecret?: string): Promise<boolean> => {
    if (apiKey && apiKey.trim().length > 0 &&
      apiSecret && apiSecret.trim().length > 0) {
      return true;
    }
    return false;
  }

  /**
   * Try to read ~/.neru-cli and extract credentials
   * Fails silently on error
   */
   public static async loginWithNeru(): Promise<void> {
    const neruConfig = path.join(process.env.HOME!, '.neru-cli');
    if (!fs.existsSync(neruConfig)) {
      return;
    }

    const { credentials } = ini.parse(fs.readFileSync(neruConfig, 'utf-8'));

    const validCredentials = await this.validateCredentials(credentials.api_key, credentials.api_secret);
    if (!validCredentials) {
      return;
    }

    const keytar = this.keytar();
    if (!keytar) {
      return;
    }

    await keytar.setPassword(
      KeytarKeys.service,
      KeytarKeys.apiKey,
      credentials.api_key
    );
    await keytar.setPassword(
      KeytarKeys.service,
      KeytarKeys.apiSecret,
      credentials.api_secret
    );

    authStatusEventEmitter.fire(new Credentials(credentials.api_key, credentials.api_secret));
  }

  public static async login(apiKey?: string, apiSecret?: string): Promise<void> {
    const keytar = this.keytar();
    const validCredentials = await this.validateCredentials(apiKey, apiSecret);
    if (apiKey && apiSecret && validCredentials && keytar) {

      await keytar.setPassword(
        KeytarKeys.service,
        KeytarKeys.apiKey,
        apiKey
      );
      await keytar.setPassword(
        KeytarKeys.service,
        KeytarKeys.apiSecret,
        apiSecret
      );

      vscode.commands.executeCommand('setContext', 'vonage:authenticated', true);
      authStatusEventEmitter.fire(new Credentials(apiKey, apiSecret));
      return;
    }

    vscode.window.showErrorMessage(`The API key & secret provided were not invalid.`);
  }

  public static async logout(): Promise<void> {
    const keytar = this.keytar();
    if (keytar) {
      await keytar.deletePassword(KeytarKeys.service, KeytarKeys.apiKey);
      await keytar.deletePassword(KeytarKeys.service, KeytarKeys.apiSecret);
    }
    vscode.commands.executeCommand('setContext', 'vonage:authenticated', false);
    authStatusEventEmitter.fire(new Credentials(undefined, undefined));
  }

  public static async getCredentials(): Promise<Credentials> {
    const keytar = this.keytar();
    if (keytar) {
      const apiKey = await keytar.getPassword(
        KeytarKeys.service,
        KeytarKeys.apiKey
      );
      const apiSecret = await keytar.getPassword(
        KeytarKeys.service,
        KeytarKeys.apiSecret
      );
      if (apiKey && apiSecret) {
        return new Credentials(apiKey, apiSecret);
      }
    }
    return new Credentials();
  }

  public static async isAuthenticated(): Promise<boolean> {
    const credentials = await this.getCredentials();
    return credentials.isAuthenticated();
  }

  public static async getHeaders(): Promise<any> {
    const credentials = await this.getCredentials();
    if (credentials.isAuthenticated()) {
      const buff = Buffer.from(`${credentials.api_key}:${credentials.api_secret}`, 'utf-8');
      const base64 = buff.toString('base64');

      const headers = {
        Authorization: `Basic ${base64}`,
        "Content-Type": 'application/json'
      };
      return headers;
    }
    return {};
  }

  public static dispose() {
    authStatusEventEmitter.dispose();
  }

  private static getNodeModule<T>(moduleName: string): T | undefined {
    const r =
      typeof __webpack_require__ === 'function'
        ? __non_webpack_require__
        : require;
    try {
      return r(`${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
    } catch (err) {
      // Not in ASAR.
    }
    try {
      return r(`${vscode.env.appRoot}/node_modules/${moduleName}`);
    } catch (err) {
      // Not available
    }
    return undefined;
  }

  private static keytar(): typeof keytartype | undefined {
    return this.getNodeModule<
      typeof keytartype
    >('keytar');
  }
}

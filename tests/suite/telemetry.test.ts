import * as assert from 'assert';
import * as vscode from 'vscode';
import { GoogleAnalyticsTelemetry } from '../../src/telemetry';

suite('Telemetry', function () {
  this.timeout(20000);
  const telemetry = GoogleAnalyticsTelemetry.getInstance();

  test('respects overall and Vonage-specific telemetry configs', async () => {
    const workspaceFolder =
      vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
    const telemetryConfig = vscode.workspace.getConfiguration('telemetry', workspaceFolder);
    const vonageTelemetryConfig = vscode.workspace.getConfiguration(
      'vonage.telemetry',
      workspaceFolder,
    );

    await telemetryConfig.update('enableTelemetry', false, vscode.ConfigurationTarget.Global);
    await vonageTelemetryConfig.update('enabled', false);
    assert.strictEqual(telemetry.isTelemetryEnabled(), false);

    await telemetryConfig.update('enableTelemetry', false, vscode.ConfigurationTarget.Global);
    await vonageTelemetryConfig.update('enabled', true);
    assert.strictEqual(telemetry.isTelemetryEnabled(), false);

    await telemetryConfig.update('enableTelemetry', true, vscode.ConfigurationTarget.Global);
    await vonageTelemetryConfig.update('enabled', false);
    assert.strictEqual(telemetry.isTelemetryEnabled(), false);

    await telemetryConfig.update('enableTelemetry', true, vscode.ConfigurationTarget.Global);
    await vonageTelemetryConfig.update('enabled', true);
    assert.strictEqual(telemetry.isTelemetryEnabled(), true);
  });
});
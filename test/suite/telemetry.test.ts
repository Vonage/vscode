import * as assert from 'assert';
import * as vscode from 'vscode';
import { GoogleAnalyticsTelemetry } from '../../src/telemetry';

suite('GoogleAnalyticsTelemetry', function () {
  this.timeout(20000);
  const telemetry = GoogleAnalyticsTelemetry.getInstance();

  suite('Telemetry configs', () => {
    test('Respects overall and Vonage-specific telemetry configs', async () => {
      const workspaceFolder =
        vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0];
      const telemetryConfig = vscode.workspace.getConfiguration('telemetry', workspaceFolder);
      const stripeTelemetryConfig = vscode.workspace.getConfiguration(
        'vonage.telemetry',
        workspaceFolder,
      );

      await telemetryConfig.update('enableTelemetry', false);
      await stripeTelemetryConfig.update('enabled', false);
      assert.strictEqual(telemetry.isTelemetryEnabled(), false);

      await telemetryConfig.update('enableTelemetry', false);
      await stripeTelemetryConfig.update('enabled', true);
      assert.strictEqual(telemetry.isTelemetryEnabled(), false);

      await telemetryConfig.update('enableTelemetry', true);
      await stripeTelemetryConfig.update('enabled', false);
      assert.strictEqual(telemetry.isTelemetryEnabled(), false);

      await telemetryConfig.update('enableTelemetry', true);
      await stripeTelemetryConfig.update('enabled', true);
      assert.strictEqual(telemetry.isTelemetryEnabled(), true);
    });
  });
});
import chai from 'chai';
import Sinon from 'sinon';
import vscode from 'vscode';
import { HelpCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { HelpViewDataProvider } from '../../../src/views';
import { mocks } from '../../mocks';

chai.should();

suite('Commands:Help', function() {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  const openExternalStub = Sinon.stub(vscode.env, 'openExternal');

  const viewProvider = new HelpViewDataProvider();

  const helpCommands = new HelpCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry,
    viewProvider);

  this.beforeEach(() => {
    telemetrySendEvent.resetHistory();
    openExternalStub.resetHistory();
  });

  this.afterAll(() => {
    telemetrySendEvent.restore();
    openExternalStub.restore();
  });

  test('refresh refreshes appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'refresh');

    helpCommands.refresh();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('openDocs opens external url', async () => {
    helpCommands.openDocs();
    telemetrySendEvent.calledOnce.should.eq(true);
    openExternalStub.calledOnce.should.eq(true);
  });

  test('openReportIssue fires an extension command', async () => {
    const stub = Sinon.stub(vscode.commands, 'executeCommand');

    helpCommands.openReportIssue();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('openSurvey opens external url', async () => {
    helpCommands.openSurvey();
    telemetrySendEvent.calledOnce.should.eq(true);
    openExternalStub.calledOnce.should.eq(true);
  });

  test('openTelemetryInfo opens external url', async () => {
    helpCommands.openTelemetryInfo();
    telemetrySendEvent.calledOnce.should.eq(true);
    openExternalStub.calledOnce.should.eq(true);
  });
});
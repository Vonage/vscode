import chai from 'chai';
import Sinon from 'sinon';
import { ApplicationCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { mocks, vonage } from '../../mocks';
import { ApplicationViewDataProvider, ApplicationTreeItem } from '../../../src/views';

chai.should();

suite('Commands:Applications', function() {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');
  const node = new ApplicationTreeItem(vonage.applicationMock);

  const viewProvider = new ApplicationViewDataProvider();

  const applicationsCommands = new ApplicationCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry,
    viewProvider);

  this.beforeEach(() => {
    telemetrySendEvent.resetHistory();
  });

  this.afterAll(() => {
    telemetrySendEvent.restore();
  });

  test('refreshAppsList refreshes appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'refresh');

    applicationsCommands.refreshAppsList();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('addApp calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'createApplication');

    applicationsCommands.addApp();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('updateApp calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'updateApplication');

    applicationsCommands.updateApp(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('deleteApp calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'deleteApplication');

    applicationsCommands.deleteApp(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('linkApp calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'linkApplication');

    applicationsCommands.linkApp(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('voiceAdd calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'addVoice');

    applicationsCommands.voiceAdd(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('voiceUpdate calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'updateVoice');

    applicationsCommands.voiceUpdate(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('voiceDelete calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'deleteVoice');

    applicationsCommands.voiceDelete(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('rtcAdd calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'addRTC');

    applicationsCommands.rtcAdd(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('rtcUpdate calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'updateRTC');

    applicationsCommands.rtcUpdate(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('rtcDelete calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'deleteRTC');

    applicationsCommands.rtcDelete(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('messagesAdd calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'addMessages');

    applicationsCommands.messagesAdd(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('messagesUpdate calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'updateMessages');

    applicationsCommands.messagesUpdate(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('messagesDelete calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'deleteMessages');

    applicationsCommands.messagesDelete(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('vbcAdd calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'addVBC');

    applicationsCommands.vbcAdd(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('vbcDelete calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'deleteVBC');

    applicationsCommands.vbcDelete(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });
});
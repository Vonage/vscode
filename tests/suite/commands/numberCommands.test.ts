import chai from 'chai';
import Sinon from 'sinon';
import { NumbersCommands } from '../../../src/commands';
import { LocalTelemetry } from '../../../src/telemetry';
import { mocks, vonage } from '../../mocks';
import { NumbersViewDataProvider, NumberTreeItem } from '../../../src/views';

chai.should();

suite('Commands:Numbers', function() {

  const telemetry = new LocalTelemetry();
  const telemetrySendEvent = Sinon.stub(telemetry, 'sendEvent');

  const viewProvider = new NumbersViewDataProvider(mocks.extensionContextMock.globalState);

  const numbersCommands = new NumbersCommands(
    mocks.extensionContextMock.subscriptions,
    telemetry,
    viewProvider);

  this.beforeEach(() => {
    telemetrySendEvent.resetHistory();
  });

  this.afterAll(() => {
    telemetrySendEvent.restore();
  });

  test('refreshNumbersList refreshes appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'refresh');

    numbersCommands.refreshNumbersList();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('buyNumber calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'buyNumber');

    numbersCommands.buyNumber();
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('cancelNumber calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'cancelNumber');
    const node = new NumberTreeItem(vonage.numberMock); 
    numbersCommands.cancelNumber(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('assignNumber calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'assignNumber');
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.assignNumber(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('unassignNumber calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'unassignNumber');
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.unassignNumber(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });

  test('copyNumber calls appropriate view', async () => {
    const stub = Sinon.stub(viewProvider, 'copyNumber');
    const node = new NumberTreeItem(vonage.numberMock);
    numbersCommands.copyNumber(node);
    telemetrySendEvent.calledOnce.should.eq(true);
    stub.calledOnce.should.eq(true);
    stub.restore();
  });
});
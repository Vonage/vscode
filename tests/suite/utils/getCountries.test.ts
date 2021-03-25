import chai, { expect } from 'chai';
import * as utils from '../../../src/utils';
import { StorageKeys } from '../../../src/enums';
import { TestMemento } from '../../mocks/vscode';

chai.should();

suite('Utils:getCountries', function() {

  const storage = new TestMemento();

  this.beforeEach(() => {
    storage.storage = new Map();
  });

  test('Returns the most recently picked country selected', async () => {
    storage.update(StorageKeys.lastCountrySelected, 'US');
    const countryList = utils.getCountries(storage);

    const selectedItem = countryList.find(f => f.picked);

    expect(selectedItem).to.exist;
    expect(selectedItem?.description).to.eq('US');
  });

  test('Returns list of countries with no picked items when never used', async () => {
    const countryList = utils.getCountries(storage);

    expect(countryList.find(f => f.picked)).not.to.exist;
  });
});
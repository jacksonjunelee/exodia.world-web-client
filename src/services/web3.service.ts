import * as Web3 from 'web3';
import { Injectable } from '@angular/core';
import { MetamaskService } from './metamask.service';
import { Outcome, OutcomeType } from '../models/outcome.model';

declare const window: any;
const eth: any = require('../../eth.json');

@Injectable()
export class Web3Service {
  private web3: any;

  constructor(private metamaskService: MetamaskService) {
    // Setup Web3 provider.
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      const provider = eth.ENV === 'dev' ? eth.TEST_RPC_PROVIDER : eth.HTTP_PROVIDER;
      this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    }
  }

  getInstance(): any {
    return this.web3;
  }

  getContract(ABI: any, address: string): any {
    return this.web3.eth.contract(ABI).at(address);
  }

  getDefaultAccount(): string {
    return this.web3.eth.defaultAccount;
  }

  setDefaultAccount(address: string): void {
    this.web3.eth.defaultAccount = address;
  }

  fromWei(value: any, unit: string): any {
    return this.web3.fromWei(value, unit);
  }

  toWei(value: any, unit: string): any {
    return this.web3.toWei(value, unit);
  }

  getTransactionReceipt(hashString: string, callback: any): any {
    return this.web3.eth.getTransactionReceipt(hashString, callback);
  }

  getAccounts(): Promise<Outcome> {
    return new Promise<Outcome>((resolve, reject) => {
      this.web3.eth.getAccounts((err, accounts) => {
        if (err) {
          reject(new Outcome(OutcomeType.Fail, err));
        }
        if (accounts) {
          resolve(new Outcome(OutcomeType.Success, accounts));
        } else {
          reject(new Outcome(OutcomeType.Fail, null, 'accounts is undefined'));
        }
      });
    });
  }

  checkTransactionStatus(
    resolve: (outcome: Outcome) => void,
    reject: (outcome: Outcome) => void
  ): (transactionHash: string) => void
  {
    return (transactionHash: string) => {
      this.web3.eth.getTransactionReceipt(transactionHash, receipt => {
        if (parseInt(receipt.status, 16) === 1) {
          resolve(new Outcome(OutcomeType.Success, receipt));
        } else {
          reject(new Outcome(OutcomeType.Fail, receipt));
        }
      });
    };
  }
}

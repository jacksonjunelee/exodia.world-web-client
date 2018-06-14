import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import * as calculatorHelper from './helpers';

/**
 * Displays Forms to calculate Interest
 */
@Component({
  selector: 'exo-wallet-calculator',
  template: `
    <h3>EXO Interest Calculator</h3>
    <form [formGroup]="calculatorForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input class="form-control" formControlName="exoDate" type="date">
        <input class="form-control" formControlName="exoStake" type="number"
          placeholder="Total EXO Staked">
        <input class="form-control" formControlName="stakingDays" type="number"
          placeholder="Staking Days">
        <select class="form-control" formControlName="interest">
           <option class="capitalize" *ngFor="let interest of interestArray"
            [value]="interest">{{interest}}</option>
        </select>
      </div>
      <div class="calculate-bar">
        <button type="submit" class="">Calculate</button>
        <p><strong>{{exoAmount}} EXO</strong></p>
      </div>
    </form>
  `,
  styleUrls: ['calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Input() isMaximized = false;

  calculatorForm: FormGroup;
  public interestArray: string[] = ['Interest']
  public exoAmount: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calculatorForm = this.fb.group({
      exoDate: '',
      exoStake: null,
      stakingDays: null,
      interest: 'Interest'
    });
  }

  onSubmit(): void {
    const stakeDays = this.calculatorForm.get('stakingDays').value;
    const exoStake = this.calculatorForm.get('exoStake').value;
    const stakeDate = moment(this.calculatorForm.get('exoDate').value);
    const stakeEndDate = moment(this.calculatorForm.get('exoDate').value).add(stakeDays, 'days');
    let totalInterest = 0;

    // less than 3 years after ICO
    if (stakeEndDate.isBefore(calculatorHelper.ICO_THREEYEARS)) {
      const eligibleStakeDays = Math.floor(stakeDays / 7) * 7;
      // Ex: interest = 50 EXO * (10%/365 days) * 28 days
      totalInterest = Math.floor(exoStake * (0.1 / 365) * eligibleStakeDays);
    }

    // 5% for the rest of the years
    if (stakeEndDate.isAfter(calculatorHelper.ICO_THREEYEARS)) {
      // adds one to include the start date
      const diff = calculatorHelper.ICO_THREEYEARS.diff(stakeDate, 'days') + 1;

      if (diff > 0) {
        const interestTenpercent = Math.floor(exoStake * (0.1 / 365) * diff);
        const leftOverStakeDays = Math.floor(stakeDays / 7) * 7 - diff;
        const interestLeftOver = Math.floor(exoStake * (0.05 / 365) * leftOverStakeDays);
        totalInterest = interestTenpercent + interestLeftOver;
      } else {
        const eligibleStakeDays = Math.floor(stakeDays / 7) * 7;
        totalInterest =  Math.floor(exoStake * (0.05 / 365) * eligibleStakeDays);
      }
    }

    this.exoAmount = totalInterest;
  }
}

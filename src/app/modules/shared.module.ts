import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MatTooltipModule } from '@angular/material/tooltip';

// Import shared services.
import { WindowService } from '../services/window.service';
import { ChromeService } from '../services/chrome.service';
import { ElectronService } from '../services/electron.service';
import { MetamaskService } from '../services/metamask.service';
import { Web3Service } from '../services/web3.service';
import { OutcomeService } from '../services/outcome.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MatTooltipModule
  ],
  providers: [
    WindowService,
    ChromeService,
    ElectronService,
    MetamaskService,
    Web3Service,
    OutcomeService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MatTooltipModule
  ]
})
export class SharedModule { }

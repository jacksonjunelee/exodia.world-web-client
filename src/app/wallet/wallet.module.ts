import { NgModule } from '@angular/core';
import { SharedModule } from '../modules/shared.module';
import { ToExponentialPipeModule } from '../pipes/to-exponential.module';
import { WalletService } from './shared/wallet.service';
import { WalletComponent } from './wallet.component';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    SharedModule,
    ToExponentialPipeModule
  ],
  providers: [
    WalletService
  ],
  exports: [
    WalletComponent
  ]
})
export class WalletModule { }

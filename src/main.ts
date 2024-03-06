import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCfEx/WmFZfVpgdV9FZlZRTWYuP1ZhSXxXdkRiXn9ec3BRR2BdVkI='
);


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

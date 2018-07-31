import { NgModule } from '@angular/core';
import { TestComponent } from './test/test';
import { SidemenuComponent } from './sidemenu/sidemenu';
@NgModule({
	declarations: [TestComponent,
    SidemenuComponent],
	imports: [],
	exports: [TestComponent,
    SidemenuComponent]
})
export class ComponentsModule {}

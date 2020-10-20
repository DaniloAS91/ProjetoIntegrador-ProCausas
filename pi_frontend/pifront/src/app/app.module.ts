import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { NgxMaskModule} from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeedComponent } from './feed/feed.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestaquesComponent } from './destaques/destaques.component';
import { ContatoComponent } from './contato/contato.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostTemaComponent } from './post-tema/post-tema.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PutPostagemComponent } from './put-postagem/put-postagem.component';
import { AlertasComponent } from './alertas/alertas.component';
import { DeletePostagemComponent } from './delete-postagem/delete-postagem.component';
import { PutTemaComponent } from './put-tema/put-tema.component';
import { DeleteTemaComponent } from './delete-tema/delete-tema.component';
import { CasaComponent } from './casa/casa.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedUsuarioComponent } from './feed-usuario/feed-usuario.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedComponent,
    FooterComponent,
    DestaquesComponent,
    ContatoComponent,
    HomeComponent,
    CadastroComponent,
    LoginComponent,
    SidebarComponent,
    PostTemaComponent,
    SobreNosComponent,
    PutPostagemComponent,
    AlertasComponent,
    DeletePostagemComponent,
    PutTemaComponent,
    DeleteTemaComponent,
    CasaComponent,
    PerfilComponent,
    FeedUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    OrderModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxViacepModule

  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { Contato } from '../../componentes/contato/contato';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    FooterComponent,
    RouterLink,
    CabecalhoComponent
],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css',
})
export class PerfilContatoComponent implements OnInit {
  @Input() id?: number;

contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '',
    observacoes: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contato = contato;
      });
    }
  }

  excluir() {
    if (this.contato.id) {
      this.contatoService.excluirContato(this.contato.id).subscribe(() => {
        this.router.navigateByUrl('/lista-contatos');
      });
    }
  }
}

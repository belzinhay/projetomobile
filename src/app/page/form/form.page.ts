import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  routeId = null;
  livro: any = {};

  constructor(
    private activateRoute: ActivatedRoute,
    private banco: DatabaseService,
    private router: Router,
    private util: UtilityService
  ) { }


  ngOnInit() {

    this.routeId = this.activateRoute.snapshot.params['id'];

    if(this.routeId){
      this.banco.getReceitaUnica(this.routeId).subscribe(results => {this.livro = results});
    }
  }

  editarReceita(form: any){
    try{
    this.banco.updateReceita(form.value, this.routeId);
  } finally{
    this.util.toastMessage("Receita Atualizada", "bottom", 2000, "secondary");
    this.router.navigate(['/home']);
  }
}
}

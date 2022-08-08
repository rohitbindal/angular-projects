import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private _serversService: ServersService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(param => {
      const id = +param['params']['id'];
      this.server = this._serversService.getServer(id);
    })
  }

  onEdit() {
    this._router.navigate(['edit'], { relativeTo: this._route, queryParamsHandling: 'preserve' })
  }

}

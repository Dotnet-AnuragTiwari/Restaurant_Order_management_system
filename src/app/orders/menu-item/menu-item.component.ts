import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Item } from 'src/app/Shared/Model/item.model';
import { ItemService } from 'src/app/Shared/Services/item.service';
@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    standalone: false
})
export class MenuItemComponent implements OnInit {
ItemList: Item[];
  constructor(   @Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<MenuItemComponent>,
  private itemserv: ItemService) { }

  ngOnInit(): void {
    this.itemserv.GetItemList().then(res=> this.ItemList = res as Item[]);
  }

}

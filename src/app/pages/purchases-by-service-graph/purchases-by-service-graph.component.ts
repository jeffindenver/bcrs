/******************************************************************************
 * Title: purchases-by-service-graph.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/28/2020
 * Description: purchases by product component
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../shared/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any[];
  data: object;
  // consider itemCount, labels, totals as parallel arrays
  itemCount: number[] = [];
  labels: string[] = [];
  totals: number[] = [];

  constructor(private invoiceService: InvoiceService) {

    this.invoiceService.findPurchasesByServiceGraph().subscribe(res => {
      this.purchases = res.data;

      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
        this.totals.push(item.count * item.price);
      }

      this.data = {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: [
              //need one color per product, so 7
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#AF593E',
              '#6CDAE7'
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          }
        ]
      };

      console.log('Data object');
      console.log(this.data);
    })
   }

  ngOnInit(): void {
  }

}
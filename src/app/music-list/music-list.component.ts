import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent {
  data!: any[];
  newItem: any = {};
  searchId!: number;



  // Update the server URL here
  serverURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchData() {
    this.http.get<any[]>(`${this.serverURL}/api/data`).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addItem() {
    this.http.post(`${this.serverURL}/api/add-data`, this.newItem).subscribe(
      (response) => {
        console.log(response);
        // Clear the form and fetch updated data
        this.newItem = {};
        this.fetchData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteInstrument(id: number) {
    this.http.delete<any>(`${this.serverURL}/api/data/${id}`).subscribe(
      (response) => {
        console.log(response);
        this.fetchData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchById() {
    if (this.searchId) {
      this.http.get<any>(`${this.serverURL}/api/data/${this.searchId}`).subscribe(
        (response) => {
          console.log(response);
          this.data = response ? [response] : [];
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.fetchData();
    }
  }

  deleteAllItems() {
    if (confirm('Are you sure you want to delete all items?')) {
      this.http.delete<any>(`${this.serverURL}/api/data`).subscribe(
        (response) => {
          console.log(response);
          this.fetchData();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}

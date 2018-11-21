import { Component, OnInit, Input } from '@angular/core';
import { ProjectWorker } from '../shared/models/projectWorker';
import { TeamleaderService } from '../shared/services/teamleader.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-project-worker-details-template',
  templateUrl: './project-worker-details-template.component.html',
  styleUrls: ['./project-worker-details-template.component.css']
})
export class ProjectWorkerDetailsTemplateComponent implements OnInit {

  constructor(public teamleaderService: TeamleaderService) { }
  Isng: boolean = true;
  hoursForProject: number;
  @Input()
  workerProject: ProjectWorker
  isEditHours: boolean = false
  workerToEditHours: ProjectWorker;
  ngOnInit(keySearch?: string) {

  }
  // this.medicineServ.getAllMedicine().subscribe(medicines => {

  //  },
  //     (error: HttpErrorResponse) => alert("can't connect to database"))
  // if(this.Isng)
  // {
  //     this.teamleaderService.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword")).subscribe(userMedicineList => {
  //       this.userMedicineList = userMedicineList;
  //     },
  //       (error: HttpErrorResponse) => alert("can't connect to database"))
  //   }
  //   else 
  //   {
  //     this.userMedicineList=[];
  //   this.medicineServ.getBooksSearch(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword"),keySearch).subscribe(res => {console.log(res);  this.userMedicineList = res }, err => { });
  //   }}

  // search(keySearch) {
  //   if(keySearch)
  //   {
  //   this.Isng=false;
  //   this.ngOnInit(keySearch);
  //   }
  //   else{
  //     this.Isng=true;
  //        this.ngOnInit();
  //   }
  // }
  editHours(worker: ProjectWorker) {
    // this.isEditHours=true;
    this.hoursForProject = worker.hoursForProject;



    swal({
      
      title: 'Enter units in stock',
      input: 'number',
      inputValue:`${worker.hoursForProject}`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.hoursForProject=login;
        this.workerToEditHours = worker;
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this.hoursForProject=result.value;
        this.updateHours();
      }
    })
    // this.isEditStock=true;
  
    // document.getElementById("editstock").style.visibility='visible';
    //   this.unitsInStock=medicine.unitsInStock;
    //   this.medicineToUpdateStack=medicine;

    
  }
  updateHours() {
    swal({
      title: `Are you sure you want to edit the hours to ${this.hoursForProject} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        this.workerToEditHours.hoursForProject = this.hoursForProject;
        this.workerToEditHours.project = null;
        this.teamleaderService.updateHours(this.workerToEditHours).subscribe(res => {
          if (res == true) {
            swal(
              `the hours update to ${this.hoursForProject}`
            )


          }
          else alert("not update");
        })
      }
    })

  }

}


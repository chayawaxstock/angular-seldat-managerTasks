import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
 projects: Project[]=[];
  constructor(public managerService:ManagerService,public router:Router) { }
 
  ngOnInit() {
    this.getAllProjects();
    //get all project after add ,delete 
    this.managerService.subjectProject.subscribe(v=>{
    this.getAllProjects();
     })
  }

  getAllProjects()
  {
    this.managerService.getAllProjects().subscribe(res=>{
      console.log(res);
      this.projects=res;
    });
  }
  deleteProject(id:number)
  {
    swal({
      title: 'Are you sure you want to delete this project?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        let indexProject = this.projects.findIndex(p => p.projectId == id)
        this.managerService.deleteProject(id).subscribe(res => {
          this.projects.splice(indexProject, 1);


          swal(
            'Deleted!',
            'The worker has been deleted.',
            'success'
          )

          this.router.navigate(["/manager/allProjects"])
        },err=>{swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
         
        })})



      }

    })
  }
  

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MemberDetails } from '../../models/member-details.model';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members-update',
  templateUrl: './members-update.component.html',
  styleUrls: ['./members-update.component.scss']
})
export class MembersUpdateComponent implements OnInit {

  member!: MemberDetails;
  memberForm!: FormGroup;

  constructor(
    // private service: MembersService,
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.member = this.route.snapshot.data['currentMember'];
  }

  fillMemberForm(): void {
    this.memberForm = this.builder.group({
      nom: [this.member.personne.nom, Validators.required]
    });
  }

}

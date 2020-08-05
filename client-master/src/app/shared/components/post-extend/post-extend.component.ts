import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/models/Post";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { number } from "src/app/validators/number.validator";
import { PaymentService } from "src/app/services/payment.service";

@Component({
  selector: "app-post-extend",
  templateUrl: "./post-extend.component.html",
  styleUrls: ["./post-extend.component.scss"],
})
export class PostExtendComponent implements OnInit {
  form: FormGroup;
  post: Post;
  status: string;

  constructor(
    private postService: PostService,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.form = new FormGroup({
      extendDays: new FormControl(10, [
        Validators.required,
        number,
        Validators.min(10),
      ]),
    });
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get("id");
    this.postService.getPost(id).subscribe((post) => {
      this.post = post;

      const now = new Date();
      const dateExpiration = new Date(post.dateExpiration);
      if (now > dateExpiration) {
        this.status = "Đã hết hạn";
      } else {
        let subDays = dateExpiration.getTime() - now.getTime();
        this.status = `Còn ${Math.round(subDays / 86400000)} ngày`;
      }
    });
  }

  submit() {
    const now = new Date();
    const dateExpiration = new Date(this.post.dateExpiration);

    const amount = Number(this.form.value.extendDays) * 10000;

    if (now <= dateExpiration) {
      dateExpiration.setDate(
        dateExpiration.getDate() + Number(this.form.value.extendDays)
      );
    } else {
      dateExpiration.setDate(
        now.getDate() + Number(this.form.value.extendDays)
      );
    }

    this.paymentService
      .getPaymentUrl(`${this.post.id},${dateExpiration.getTime()}`, amount)
      .subscribe((res) => {
        window.location.href = res.data;
      });
  }
}

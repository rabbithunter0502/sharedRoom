import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/models/Post";
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/Account";

declare var $: any;

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  account: Account;

  postImages = [];
  postUtilities;

  constructor(
    private postService: PostService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      $(".slider").slick({
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }, 1000);
    this.getPost();
  }

  ngAfterViewInit() {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";

      if (d.getElementById(id)) {
        //if <script id="facebook-jssdk"> exists
        delete (<any>window).FB;
        fjs.parentNode.replaceChild(js, fjs);
      } else {
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "facebook-jssdk");
  }

  // Lấy Post dựa trên id
  // Lấy Account đựa trên account id của post
  getPost() {
    const id = this.route.snapshot.paramMap.get("id");
    this.postService.getPost(id).subscribe((post) => {
      this.post = post;

      this.postImages = post.images.split(";");
      this.postUtilities = JSON.parse(this.post.utilities);

      this.accountService.getAccount(post.accountId).subscribe((account) => {
        this.account = account;
      });
    });
  }

  // Export detail to doc
  export2Doc(element, filename = "") {
    var preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerHTML + postHtml;

    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename
      ? filename + ".doc"
      : `${this.post.apartmentNumber} ${this.post.street}.doc`;

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }
}

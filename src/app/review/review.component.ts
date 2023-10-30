import { Component } from '@angular/core';
import { Review } from './review.model';
import { ReviewService } from '../review.service';


@Component({
  selector: 'app-review-form',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  review: Review = {
    userName: '',
    roomId: 0,
    rating: 0,
    comment: ''
  };

  constructor(private reviewService: ReviewService) {}

  submitReview() {
    // Call the review service to submit the review to the backend
    this.reviewService.submitReview(this.review).subscribe(
      (response) => {
        // Handle the response (e.g., show a success message)
        console.log('Review submitted successfully:', response);
        window.location.href = '/index';
      },
      (error) => {
        const err=error
        // Handle errors (e.g., display an error message)
        console.error('Error submitting review:', error);
       
        alert("Please fill all the fields")
      }
    );
  }
}

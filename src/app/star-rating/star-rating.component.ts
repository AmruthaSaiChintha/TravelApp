import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number | undefined;
  @Output() ratingChange = new EventEmitter<number>();
  maxRating: number = 5; // Set the maximum rating (adjust as needed)
  highlightedStars: number = 0; // Track the number of highlighted stars
  stars: number[] = []; // Add this property to create an array of stars

  constructor() {
    this.stars = Array(this.maxRating).fill(0).map((_, index) => index + 1);
  }

  // ... other code

  // Function to handle a star click
  onStarClick(rating: number) {
    this.highlightedStars = rating; // Highlight stars up to the clicked rating
    this.ratingChange.emit(rating); // Emit the rating change event
  }
}

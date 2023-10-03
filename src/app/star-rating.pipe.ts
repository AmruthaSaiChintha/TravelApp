import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating'
})
export class StarRatingPipe implements PipeTransform {
  transform(rating: number): string {
    // Convert the rating to stars (you can implement your logic here)
    const stars = '★'.repeat(rating);
    return stars;
  }
}

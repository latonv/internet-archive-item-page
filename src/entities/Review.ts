/**
 * The expected data shape for reviews obtained via the API
 */
export type ReviewData = {
  review_id?: string,
  reviewer?: string,
  reviewtitle?: string,
  reviewbody?: string,
  reviewdate?: string,
  createdate?: string,
  stars?: string
}

/**
 * A data class for user reviews on an archived item
 */
export class Review {

  public readonly id: string;

  public readonly reviewer: string;

  public readonly title: string;

  public readonly body: string;

  public readonly lastEditDate: Date;

  public readonly createdDate: Date;

  public readonly stars: number;

  constructor(data: ReviewData) {
    if ('review_id' in data) {
      this.id = data.review_id;
    }

    if ('reviewer' in data) {
      this.reviewer = data.reviewer;
    }

    if ('reviewtitle' in data) {
      this.title = data.reviewtitle;
    }

    if ('reviewbody' in data) {
      this.body = data.reviewbody;
    }

    if ('reviewdate' in data) {
      this.lastEditDate = new Date(data.reviewdate);
    }

    if ('createdate' in data) {
      this.createdDate = new Date(data.createdate);
    }

    if ('stars' in data) {
      this.stars = Number(data.stars);
      if (Number.isNaN(this.stars)) {
        this.stars = 0;
      }
    }
  }

}
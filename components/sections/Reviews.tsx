import { site, publishedReviews } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Concept testimonials are explicitly authorized for this fictional brand. */
export function Reviews() {
  const reviews = publishedReviews;
  if (!reviews.length) return null;
  return (
    <section
      id="reviews"
      className="section shell reviews"
      aria-labelledby="reviews-title"
    >
      <SectionLabel number="07">Отзывы</SectionLabel>
      <h2 id="reviews-title" className="section-title">
        {site.reviewsTitle}
      </h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <figure key={review.id}>
            <blockquote>
              <p>{review.quote}</p>
            </blockquote>
            <figcaption>
              {review.author}
              {review.context && <span> · {review.context}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

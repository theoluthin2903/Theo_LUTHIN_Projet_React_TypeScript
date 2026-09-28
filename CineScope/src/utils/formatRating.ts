export function formatRating(rating?: number, voteCount?: number): string {
    if (!rating || rating <= 0 || voteCount === 0) return "Note indisponible";
    return `⭐ ${rating.toFixed(1)}/10`;
}
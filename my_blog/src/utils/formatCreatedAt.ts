const formatCreatedAt = (dateString: string) => {
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffMinutes = diffMs / (1000 / 60);
  const diffHours = diffMinutes / 60;

  if (diffMinutes < 1) {
    return '방금 전';
  } else if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)}분 전`;
  } else if (diffHours < 24) {
    return `${Math.floor(diffHours)}시간 전`;
  } else {
    return createdDate
      .toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      .replace(',', '.');
  }
};

export default formatCreatedAt;

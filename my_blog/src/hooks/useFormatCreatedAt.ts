import { useEffect, useState } from 'react';

const useFormatCreatedAt = (dateString: string) => {
  const [formatted, setFormatted] = useState('');

  useEffect(() => {
    const updateFormat = () => {
      const createdDate = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - createdDate.getTime();
      const diffMinutes = diffMs / (1000 / 60);
      const diffHours = diffMinutes / 60;

      if (diffMinutes < 1) setFormatted('방금 전');
      else if (diffMinutes < 60)
        setFormatted(`${Math.floor(diffMinutes)}분 전`);
      else if (diffHours < 24) setFormatted(`${Math.floor(diffHours)}시간 전`);
      else
        setFormatted(
          createdDate
            .toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
            .replace(',', '.'),
        );
    };

    updateFormat();
    const interval = setInterval(updateFormat, 60000);
    return () => clearInterval(interval);
  }, [dateString]);

  return formatted;
};

document.addEventListener('DOMContentLoaded', () => {
    const subheadingDate = document.getElementById('subheading-date');
    const usernameInput = document.getElementById('username-input');
    const ctaButton = document.getElementById('cta-button');

    // Set today's date in "Month Day" format
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);
    subheadingDate.textContent = `Read what you tweeted on ${formattedDate} over the past decade`;

    // Load username from local storage
    const savedUsername = localStorage.getItem('twitterUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }

    ctaButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (!username) {
            alert('Please enter a Twitter username.');
            return;
        }

        // Save username to local storage
        localStorage.setItem('twitterUsername', username);

        const today = new Date();
        const currentYear = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        let searchQueries = [];
        for (let i = 1; i <= 10; i++) {
            const year = currentYear - i;
            const sinceDate = `${year}-${month}-${day}`;
            const untilDate = `${year}-${month}-${String(Number(day) + 1).padStart(2, '0')}`; // Next day for 'until'
            searchQueries.push(`(since:${sinceDate} until:${untilDate})`);
        }

        const twitterSearchURL = `https://twitter.com/search?q=(from:${username})%20(${searchQueries.join('%20OR%20')})`;
        window.open(twitterSearchURL, '_blank');
    });
}); 
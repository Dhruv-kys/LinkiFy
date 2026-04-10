const form = document.querySelector(".shortener-form");
const urlInput = document.getElementById("urlInput");
const result = document.getElementById("result");
const submitButton = document.getElementById("submitButton");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const longUrl = urlInput.value.trim();

  submitButton.disabled = true;
  submitButton.textContent = "Creating...";
  result.innerHTML = "<p>Creating short URL...</p>";

  try {
    const response = await fetch("/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      result.innerHTML = `<p>${data.error || "Something went wrong."}</p>`;
      return;
    }

    const shortUrl = `${window.location.origin}${data.shortUrl}`;

    result.innerHTML = `
      <p>Your short URL is ready:</p>
      <p class="result-url">${shortUrl}</p>
      <div class="result-actions">
        <a class="short-link-button" href="${shortUrl}" target="_blank" rel="noopener noreferrer">
          Open Short URL
        </a>
        <button class="short-link-button copy-button" type="button" id="copyButton">
          Copy URL
        </button>
      </div>
    `;

    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(shortUrl);
        copyButton.textContent = "Copied!";
      } catch (error) {
        copyButton.textContent = "Copy failed";
      }
    });

    urlInput.value = "";
  } catch (error) {
    result.innerHTML = "<p>Unable to connect to the server.</p>";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Create Short URL";
  }
});

<script>
  import { onMount } from "svelte";

  let images = [];

  onMount(async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < letters.length; j++) {
        for (let k = 0; k < numbers.length; k++) {
          for (let l = 0; l < numbers.length; l++) {
            for (let m = 0; m < numbers.length; m++) {
              for (let n = 0; n < numbers.length; n++) {
                const currentUrl = `https://prnt.sc/${letters[i]}${letters[j]}${numbers[k]}${numbers[l]}${numbers[m]}${numbers[n]}`;

                const response = await fetch(`/api/scrape?url=${currentUrl}`);

                if (response.status === 404) return;

                const imageUrl = (await response.text())
                  .toString()
                  .replace("JSHandle:", "");

                if (imageUrl && !imageUrl.includes("st.prntscr.com")) {
                  images = [
                    { imageUrl: imageUrl, currentUrl: currentUrl },
                    ...images,
                  ];
                }
              }
            }
          }
        }
      }
    }
  });
</script>

<h1>Scraped Images</h1>

<ul>
  {#each images as { imageUrl, currentUrl }}
    <li>
      <a href={imageUrl} target="_blank" class="image-link">
        <img src={imageUrl} alt="Scraped image" />
      </a>
      <a href={currentUrl} target="_blank" class="url-overlay">{currentUrl}</a>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .image-link {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .url-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 5px 10px;
    border-radius: 3px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    font-size: 12px;
    max-width: 90%;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 10;
  }
</style>

import { readPost } from "@/js/api/post/read";
import { Media, PostResponse } from "@/types/types";

export class PostMain {
  private postContainer: HTMLElement;

  $ = <T extends HTMLElement>(el: string) => {
    return this.postContainer.querySelector(el) as T;
  };

  constructor(private postId: number) {
    this.postContainer = document.getElementById("main-post") as HTMLElement;
  }

  async init() {
    if (!this.postContainer) {
      console.log("No post container found");
      return;
    }

    try {
      const postData = (await readPost(this.postId)) as PostResponse;
      this.renderPost(postData);
    } catch (error) {
      console.error(error);
    }
  }

  date = {
    getTime: (date: Date) => {
      const dateNow = new Date();
      const targetDate = new Date(date);

      const differenceInMilliseconds = dateNow.getTime() - targetDate.getTime();

      if (differenceInMilliseconds < 59_999) {
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        return `${differenceInSeconds}sec`;
      }

      if (differenceInMilliseconds < 3_599_999) {
        const differenceInMinutes = Math.floor(
          differenceInMilliseconds / (1000 * 60)
        );
        return `${differenceInMinutes} min`;
      }
      if (differenceInMilliseconds < 86_399_999) {
        const differenceInHours = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60)
        );
        return `${differenceInHours} hours`;
      }

      if (differenceInMilliseconds < 604_799_999) {
        const differenceInDays = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24)
        );
        return `${differenceInDays} days`;
      }

      if (differenceInMilliseconds < 2_629_745_999) {
        const differenceInMonths = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30)
        );
        return `${differenceInMonths} mo`;
      }

      if (differenceInMilliseconds < 31_556_951_999) {
        const differenceInYears = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
        );
        return `${differenceInYears} y`;
      }

      if (differenceInMilliseconds > 31_556_951_999) {
        const differenceInYears = Math.floor(
          differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
        );
        return `${differenceInYears} y`;
      }
    },
    getDate: (date: Date) => {
      const dateToTransform = new Date(date);
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = dateToTransform.toLocaleDateString(
        "en-US",
        options
      );
      return formattedDate;
    },
  };

  setElement = {
    avatar: ({ url, alt }: Media) => {
      const avatarContainer = this.$<HTMLImageElement>(
        "#main-post__header__avatar"
      );

      if (avatarContainer) {
        url
          ? (avatarContainer.src = url)
          : (avatarContainer.src = "/images/placeholder-avatar.jpg");
        alt
          ? (avatarContainer.alt = alt)
          : (avatarContainer.alt = "Image avatar");
      } else {
        console.error(
          "No avatar container found, please set an <img> with id 'main-post__header__avatar'"
        );
      }
    },
    name: (name: string) => {
      const nickNameContainer = this.$<HTMLSpanElement>(
        "#main-post__header__nickname"
      );
      const userProfileContainer = this.$<HTMLAnchorElement>(
        "#main-post__header__profile"
      );

      if (nickNameContainer && userProfileContainer) {
        name ? (nickNameContainer.innerText = name) : "";
        name ? (userProfileContainer.innerText = `@${name}`) : "";
        name ? (userProfileContainer.href = `/profile/?username=${name}`) : "";
      } else {
        console.error(
          `No nickname or profile container found, please set an <span> with id 'main-post__header__nickname' and an <a> with id 'main-post__header__profile'`
        );
      }
    },
    time: (created: Date, updated: Date) => {
      const timeContainer = document.querySelector(
        "#main-post__header__time"
      ) as HTMLSpanElement;
      const dateContainer = document.querySelector(
        "#main-post__footer_date"
      ) as HTMLSpanElement;

      if (timeContainer && dateContainer) {
        created
          ? (timeContainer.innerHTML = `${this.date.getTime(created)}`)
          : "";
        updated
          ? updated === created
            ? (dateContainer.innerText = `${this.date.getDate(created)}`)
            : (dateContainer.innerHTML = `${this.date.getDate(
                updated
              )} <span data-tooltip="edited"> - Updated</span>`)
          : "";
      } else {
        console.error(
          `No time or date container found, please set an <span> with id 'main-post__header__time' and an <span> with id 'main-post__footer_date'`
        );
      }
    },
    body: (body: string) => {
      const textContainer = this.$<HTMLParagraphElement>(
        "#main-post__body__text"
      );

      if (textContainer) {
        body ? (textContainer.innerText = body) : "";
      } else {
        console.error(
          `No text container found, please set an <p> with id 'main-post__body__text'`
        );
      }
    },
    media: (media: Media) => {
      const mediaContainer = this.$<HTMLImageElement>(
        "#main-post__body__media"
      );

      if (!media) {
        mediaContainer.style.display = "none";
      } else if (mediaContainer) {
        media.url ? (mediaContainer.src = media.url) : "";
        media.alt ? (mediaContainer.alt = media.alt) : "";
      } else {
        console.error(
          `No media container found, please set an <img> with id 'main-post__body__media'`
        );
      }
    },
    tags: (tags: string[]) => {
      const tagsContainer = this.$<HTMLElement>("#main-post__footer__tags");
      if (tagsContainer) {
        tags.forEach((tag) => {
          const tagEl = document.createElement("span");
          tagEl.innerText = tag;
          tagsContainer.appendChild(tagEl);
        });
      } else {
        console.error(
          `No tags container found, please set an <div> with id 'main-post__footer__tags'`
        );
      }
    },
    info: (likes: number) => {
      const likesContainer = this.$<HTMLSpanElement>(
        "#main-post__footer__likes"
      );
      const boostsContainer = this.$<HTMLSpanElement>(
        "#main-post__footer__boosts"
      );

      if (likes) {
        likesContainer.innerText = likes.toString();
      } else if (!likes) {
        likesContainer.innerText = "0";
      } else {
        console.error(
          `No likes container found, please set an <span> with id 'main-post__footer__likes'`
        );
      }
    },
  };

  renderPost(postData: PostResponse) {
    this.setElement.avatar(postData.author.avatar);
    this.setElement.name(postData.author.name);
    this.setElement.time(postData.created, postData.updated);
    this.setElement.body(postData.body);
    this.setElement.media(postData.media);
    this.setElement.tags(postData.tags);
    this.setElement.info(postData._count.reactions);
  }
}

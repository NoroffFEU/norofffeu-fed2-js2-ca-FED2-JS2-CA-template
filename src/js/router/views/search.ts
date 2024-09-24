import { renderProfile } from "@/js/ui/profile/renderUserProfile";
import { createSearchHTML } from "@/components/search/SearchRender";
import { searchProfiles } from "@/js/api/profile/search";
import { searchInputLoader } from "@/js/ui/search/searchInputLoader";
import { searchParams } from "@/js/utilities/searchParams";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { getUser } from "@/js/utilities/getUser";
import { SectionHeader } from "@/components/search/SectionHeader";

async function loadSearchPage() {
  try {
    searchInputLoader();
    renderProfile();
    const query = searchParams("q");
    if (!query) return;
    renderSearch(query);
  } catch (error) {
    console.error(error);
  }
}

async function renderSearch(query: string) {
  const searchContainer = document.querySelector("#posts") as HTMLElement;
  const getFollowingUsers = await getUserProfile();

  if (!customElements.get("section-header")) {
    customElements.define("section-header", SectionHeader);
  }

  const test = true;
  const test2 = true;

  try {
    const profiles = await searchProfiles(query, { limit: 5, page: 1 });
    if (profiles && profiles.length > 0) {
      const profilesSection = document.createElement("section");
      profilesSection.classList.add("profiles");

      const profilesSectionHeader = document.createElement("section-header");
      profilesSectionHeader.setAttribute("data-title", "profiles");
      profilesSection.appendChild(profilesSectionHeader);

      searchContainer.appendChild(profilesSection);
      profiles.forEach(async (profile) => {
        const isFollowing = getFollowingUsers?.find(
          (user) => user.name === profile.name
        )
          ? true
          : false;

        const isUserProfile = profile.name === getUser() ? true : false;

        const profileHTML = createSearchHTML(
          profile,
          isFollowing,
          isUserProfile
        );

        profilesSection.insertAdjacentHTML("beforeend", profileHTML);
      });
    }
    if (test) {
      const testSection = document.createElement("section");
      searchContainer.appendChild(testSection);

      const testSectionHeader = document.createElement("section-header");
      testSectionHeader.setAttribute("data-title", "tags");
      testSection.appendChild(testSectionHeader);

      testSection.insertAdjacentHTML("beforeend", "<p>Test</p>");
    }

    if (test2) {
      const testSection = document.createElement("section");
      searchContainer.appendChild(testSection);

      const testSectionHeader = document.createElement("section-header");
      testSectionHeader.setAttribute("data-title", "posts");
      testSection.appendChild(testSectionHeader);

      testSection.insertAdjacentHTML("beforeend", "<p>Test</p>");
    }
  } catch (error) {
    console.error(error);
  }
}

loadSearchPage();

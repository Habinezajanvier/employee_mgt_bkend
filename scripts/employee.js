const account_display = document.querySelector(".account-data");
const table_display = document.querySelector(".tables");
const intro_display = document.querySelector(".intro");
const adding_display = document.querySelector(".adding");
const search_display = document.querySelector(".search");

document.onclick = (e) => {
  /**
   * Displaying accounts data once account icon is clicked on
   */
  if (e.target.closest("#profile") || e.target.closest("#account-name")) {
    account_display.style.display = "block";
  } else {
    if (e.target.closest(".account-data")) {
      account_display.style.display = "block";
    } else {
      account_display.style.display = "none";
    }
  }

  /**
   * Displaying Search form once 'Search' or searching icon is clicked on
   */
  if (e.target.closest("#search") || e.target.closest("#search-employee")) {
    search_display.style.display = "flex";
    intro_display.style.opacity = "0.2";
  } else {
    if (
      e.target.closest(".searching-head") ||
      e.target.closest(".searching-res")
    ) {
      search_display.style.display = "flex";
      intro_display.style.opacity = "0.2";
    } else {
      if (e.target.closest("#closing-btn")) {
        search_display.style.display = "none";
        intro_display.style.opacity = "1";
      } else {
        search_display.style.display = "none";
        intro_display.style.opacity = "1";
      }
    }
  }

  /**
   * Displaying Adding form once 'Add' or adding icon is clicked on
   */
  if (e.target.closest("#add") || e.target.closest("#add-employee")) {
    adding_display.style.display = "flex";
    intro_display.style.opacity = "0.2";
  } else {
    if (e.target.closest(".adding-head") || e.target.closest(".adding-frm")) {
      adding_display.style.display = "flex";
      intro_display.style.opacity = "0.2";
    } else {
      if (e.target.closest("#closing-btn")) {
        adding_display.style.display = "none";
        intro_display.style.opacity = "1";
      } else {
        adding_display.style.display = "none";
        intro_display.style.opacity = "1";
      }
    }
  }
  /**
   * Displaying tables once 'Employees' or its icon is clicked on
   */
  if (e.target.closest("#all") || e.target.closest("#all-employee")) {
    table_display.style.display = "flex";
    intro_display.style.opacity = "0.2";
  } else {
    if (
      e.target.closest(".table-head") ||
      e.target.closest(".employee-table")
    ) {
      table_display.style.display = "flex";
      intro_display.style.opacity = "0.2";
    } else {
      if (e.target.closest("#closing-btn")) {
        table_display.style.display = "none";
        intro_display.style.opacity = "1";
      } else {
        table_display.style.display = "none";
        intro_display.style.opacity = "1";
      }
    }
  }
};

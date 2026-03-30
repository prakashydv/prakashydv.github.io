module.exports = function(eleventyConfig) {
  
  // 1. Pass-through File Copy
  // This copies your CSS and Images directly to the output folder
  eleventyConfig.addPassthroughCopy("./src/assets");

  // 2. Add a Filter (Example: Simple Date Formatter)
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // 3. Configuration Options
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
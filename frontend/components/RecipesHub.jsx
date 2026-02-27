"use client";

import Link from "next/link";

import { recipes, recipeTags } from "../lib/recipes";
import { useDocUIStore } from "../lib/store";

export default function RecipesHub() {
  const { recipeQuery, recipeTags: activeTags, setRecipeQuery, toggleRecipeTag, clearRecipeTags, selectRecipe } =
    useDocUIStore();

  const normalizedQuery = recipeQuery.trim().toLowerCase();
  const filtered = recipes.filter((recipe) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      recipe.title.toLowerCase().includes(normalizedQuery) ||
      recipe.summary.toLowerCase().includes(normalizedQuery);
    const matchesTags = activeTags.length === 0 || activeTags.every((tag) => recipe.tags.includes(tag));
    return matchesQuery && matchesTags;
  });

  return (
    <section className="recipes-hub">
      <div className="recipes-header">
        <div>
          <div className="eyebrow">Integration recipes</div>
          <h1>Find the right pipeline fast</h1>
          <p>Filter by environment, export target, or runtime. Copy configs and start shipping.</p>
        </div>
        <button className="ghost-button" onClick={clearRecipeTags}>
          Clear filters
        </button>
      </div>

      <div className="recipes-controls">
        <input
          className="search-input"
          placeholder="Search recipes for OTLP, Graphistry, Kaggle…"
          value={recipeQuery}
          onChange={(event) => setRecipeQuery(event.target.value)}
        />
        <div className="chip-grid">
          {recipeTags.map((tag) => (
            <button
              key={tag}
              className={activeTags.includes(tag) ? "chip chip-active" : "chip"}
              onClick={() => toggleRecipeTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="recipes-grid">
        {filtered.map((recipe) => (
          <article key={recipe.id} className="recipe-card" onClick={() => selectRecipe(recipe.id)}>
            <div className="recipe-title">{recipe.title}</div>
            <div className="recipe-summary">{recipe.summary}</div>
            <div className="recipe-tags">
              {recipe.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="recipe-steps">
              {recipe.steps.map((step) => (
                <div key={step} className="recipe-step">
                  {step}
                </div>
              ))}
            </div>
            <div className="recipe-footer">
              <span className="recipe-time">{recipe.time}</span>
              <Link className="text-link" href={recipe.href}>
                Open guide →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

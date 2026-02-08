interface CategoryTileProps {
  label: string;
  count: number;
  active?: boolean;
}

export function CategoryTiles({
  categories,
  selected,
  onSelect,
}: {
  categories: CategoryTileProps[];
  selected: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {categories.map((category) => {
        const isActive = category.label === selected;

        return (
          <button
            key={category.label}
            type="button"
            onClick={() => onSelect(category.label)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-900 hover:border-slate-300"
            }`}
          >
            <p className="text-sm font-semibold">{category.label}</p>
            <p className={`text-xs ${isActive ? "text-slate-200" : "text-slate-500"}`}>
              {category.count} roles
            </p>
          </button>
        );
      })}
    </div>
  );
}

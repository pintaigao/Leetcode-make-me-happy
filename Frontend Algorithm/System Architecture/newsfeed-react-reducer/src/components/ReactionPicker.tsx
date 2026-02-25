import type { ReactionType } from '../types/newsfeed';

const OPTIONS: Array<{ type: ReactionType; label: string; emoji: string }> = [
  { type: 'like', label: 'Like', emoji: '👍' },
  { type: 'love', label: 'Love', emoji: '❤️' },
  { type: 'haha', label: 'Haha', emoji: '😆' },
  { type: 'wow', label: 'Wow', emoji: '😮' },
  { type: 'sad', label: 'Sad', emoji: '😢' },
  { type: 'angry', label: 'Angry', emoji: '😡' },
];

export default function ReactionPicker({
  selected,
  onSelect,
}: {
  selected: ReactionType | null;
  onSelect: (r: ReactionType | null) => void;
}) {
  return (
    <div
      className="card"
      role="dialog"
      aria-label="Reactions"
      style={{ position: 'absolute', top: -56, left: 0, padding: 8 }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {OPTIONS.map((o) => (
          <button
            key={o.type}
            className="btn"
            onClick={() => onSelect(o.type === selected ? null : o.type)}
            aria-pressed={o.type === selected}
            title={o.label}
            style={{ padding: '6px 8px' }}
          >
            <span aria-hidden style={{ fontSize: 18 }}>
              {o.emoji}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

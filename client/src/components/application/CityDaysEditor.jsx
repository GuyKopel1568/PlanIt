import React, { useMemo, useState } from 'react';
import { updateTripCityDays } from '../../api/trips';

function formatDateOnly(value) {
  if (!value) return '';
  const d = new Date(value);
  // Render as local date (no time)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getInclusiveTripDays(trip) {
  const range = trip?.selectedDates?.[0];
  if (!range?.startDate || !range?.endDate) return null;

  const s = new Date(range.startDate);
  const e = new Date(range.endDate);

  // Normalize to local midnight to avoid TZ/time noise
  const s0 = new Date(s.getFullYear(), s.getMonth(), s.getDate());
  const e0 = new Date(e.getFullYear(), e.getMonth(), e.getDate());

  const ms = e0 - s0;
  if (ms < 0) return null;

  // Inclusive days: e.g., Aug 1 → Aug 3 = 3 days
  return Math.floor(ms / 86400000) + 1;
}

export default function CityDaysEditor({ trip, onSaved }) {
  // Rows to edit
  const rows = useMemo(() => {
    const list = Array.isArray(trip?.selectedCities) ? trip.selectedCities : [];
    return list.map((c, i) => ({
      key: c._id || c.value || c.label || String(i),
      label: c.label || c.name || 'City',
      current: typeof c.days === 'number' ? c.days : 1,
    }));
  }, [trip]);

  const [draft, setDraft] = useState(
    Object.fromEntries((rows || []).map((r) => [r.key, r.current]))
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  // Totals
  const totalCityDays = Object.values(draft).reduce(
    (sum, v) => sum + (Number(v) || 0),
    0
  );

  const tripDays = getInclusiveTripDays(trip); // may be null if dates missing
  const diff =
    tripDays == null ? null : Number((totalCityDays - tripDays).toFixed(2));
  const changed = rows.some((r) => Number(draft[r.key]) !== r.current);

  const onChange = (key, val) => {
    setDraft((prev) => ({ ...prev, [key]: val }));
  };

  const onApply = async () => {
    try {
      setSaving(true);
      setErr('');
      const updated = await updateTripCityDays(trip, draft);
      onSaved?.(updated);
    } catch (e) {
      setErr(e.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (!rows.length) return <p className="text-sm text-gray-500">No cities.</p>;

  // Dates display
  const range = trip?.selectedDates?.[0];
  const startLabel = formatDateOnly(range?.startDate);
  const endLabel = formatDateOnly(range?.endDate);

  return (
    <div className="space-y-3">
      {/* Header with trip window + status */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-gray-700">
          {tripDays != null ? (
            <>
              Trip window:&nbsp;
              <b>{startLabel}</b> → <b>{endLabel}</b>
              &nbsp;(<b>{tripDays}</b> days)
            </>
          ) : (
            <span className="text-gray-500">No trip dates set</span>
          )}
        </div>

        {tripDays != null && (
          <div>
            {diff === 0 ? (
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Perfect match
              </span>
            ) : diff > 0 ? (
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                Over by {diff}
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                Add {Math.abs(diff)} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Editable rows */}
      <div className="rounded-lg border divide-y">
        {rows.map((r) => (
          <div
            key={r.key}
            className="flex items-center justify-between p-3 gap-3"
          >
            <span className="font-medium truncate">{r.label}</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.5"
              step="0.5"
              className="w-28 border rounded px-2 py-1 text-right"
              value={draft[r.key]}
              onChange={(e) => onChange(r.key, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Totals and actions */}
      <div className="flex items-center justify-between text-sm text-gray-700">
        <div>
          Cities total:&nbsp;<b>{Number(totalCityDays.toFixed(2))}</b> days
        </div>
        {tripDays != null && (
          <div className="text-gray-600">
            Difference:&nbsp;
            <b
              className={
                diff === 0
                  ? 'text-green-700'
                  : diff > 0
                    ? 'text-red-700'
                    : 'text-amber-700'
              }
            >
              {diff > 0 ? `+${diff}` : diff}
            </b>
          </div>
        )}
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <button
        onClick={onApply}
        disabled={saving || !changed}
        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Apply'}
      </button>
    </div>
  );
}

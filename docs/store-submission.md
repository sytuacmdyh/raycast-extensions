# Timestamp Converter — Raycast Store submission

## Submission status

Draft PR created: https://github.com/raycast/extensions/pull/33228

Submission branch: `sytuacmdyh/raycast-store-extensions:codex/add-timestamp-converter`, under `extensions/timestamp-converter/`. The Raycast author `sytuacmdyh` has passed the official manifest check. The extension has not been accepted or published to the Store. A user-provided Windows screenshot has been added. Manual distribution-build UI verification is still pending.

## Proposed PR title

Add Timestamp Converter extension

## Proposed PR body

### Description

Add a Windows/macOS timestamp converter with a Simplified Chinese command interface. One view shows the conversion result above a continuously updating current-time section. Both sections provide local datetime, UTC ISO datetime, Unix seconds, and Unix milliseconds, with copy actions.

The parser accepts integer timestamps, local calendar dates, and ISO dates with explicit offsets. Users can override automatic seconds/milliseconds detection. Invalid calendar dates and nonexistent local daylight-saving times are rejected.

The Store already has overlapping extensions, including [Unix Timestamp](https://www.raycast.com/destiner/unix-timestamp), [Date Format Converter](https://www.raycast.com/yangxy/date-format-converter), and [Unix Timestamp Converter](https://www.raycast.com/ride-space/unix-timestamp-converter). This submission proposes a combined conversion/live-clock view and Simplified Chinese interface; it does not claim timestamp conversion or Windows support is unique. Whether this warrants a separate extension is left to the maintainers' review.

### Screencast

A real user-provided Windows screenshot is included at `extensions/timestamp-converter/media/current-time.png`. It shows the current-time view. An aspect-preserving resize on a neutral background is included at `metadata/timestamp-converter-1.png` and passed the official 2000 × 1250 screenshot validator. A static image does not verify one-second refresh, conversions, clipboard behavior, or the latest distribution build.

### Checklist

- [x] I read the extension guidelines.
- [x] I read the documentation about publishing.
- [ ] I ran `npm run build` and tested the distribution build in Raycast. (Automated build passes; manual distribution UI verification is pending.)
- [x] I checked that files in the `assets` folder are used by the extension itself.
- [x] I checked that README media are correctly located. (The real screenshot is in `media/current-time.png`.)

## Manual verification and screenshots

1. Install the prepared distribution build into native Windows Raycast.
2. Open **Convert Timestamp** (also searchable as **时间戳转换**).
3. With empty input, confirm the four current-time values refresh every second.
4. Enter `1700000000123`, verify UTC is `2023-11-14T22:13:20.123Z`, and copy a result.
5. Enter `2024-02-29T08:00:00+08:00`, verify UTC is `2024-02-29T00:00:00.000Z`.
6. Confirm `2023-02-29` displays an error.
7. Capture the actual Raycast window. The official Store screenshot specification is PNG, 2000 × 1250; Capture Window can save screenshots to metadata where available. Include the live clock and conversion view, without unrelated windows or personal data.

## Authentication

A Raycast handle identifies the author, but does not authenticate GitHub. Creating a fork and draft PR in `raycast/extensions` also needs a GitHub session authorized to perform those actions. Do not place credentials in this repository.

## References

- https://developers.raycast.com/basics/prepare-an-extension-for-store
- https://developers.raycast.com/basics/publish-an-extension
- https://manual.raycast.com/extensions-guidelines

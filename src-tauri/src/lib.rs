use font_kit::family_name::FamilyName;
use font_kit::properties::Properties;
use font_kit::source::SystemSource;

#[tauri::command]
fn list_monospaced_fonts() -> Vec<String> {
    let source = SystemSource::new();
    let families = match source.all_families() {
        Ok(f) => {
            log::info!("Found {} font families", f.len());
            f
        }
        Err(e) => {
            log::error!("Failed to enumerate font families: {:?}", e);
            return Vec::new();
        }
    };

    let mut monospaced: Vec<String> = families
        .into_iter()
        .filter(|family| {
            source
                .select_best_match(
                    &[FamilyName::Title(family.clone())],
                    &Properties::new(),
                )
                .ok()
                .and_then(|handle| handle.load().ok())
                .map(|font| font.is_monospace())
                .unwrap_or(false)
        })
        .collect();

    monospaced.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));
    monospaced.dedup();
    log::info!("Returning {} monospaced fonts", monospaced.len());
    monospaced
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![list_monospaced_fonts])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

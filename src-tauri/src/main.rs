#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
#![feature(proc_macro_hygiene, decl_macro)]

extern crate rocket;

mod server;

use std::thread;

fn main() {
  thread::spawn(|| {
    server::main();
  });

  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

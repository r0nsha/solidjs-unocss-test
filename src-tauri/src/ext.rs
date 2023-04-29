use tauri::{App, Manager, Window};

pub trait AppExt {
    fn main_window(&self) -> Option<Window>;
}

impl AppExt for App {
    fn main_window(&self) -> Option<Window> {
        self.get_window("main")
    }
}

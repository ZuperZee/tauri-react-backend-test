use rocket::{http::Header, Request, Response};

use rocket::{
  fairing::{Fairing, Info, Kind},
  get, routes,
};

pub struct CORS;

impl Fairing for CORS {
  fn info(&self) -> Info {
    Info {
      name: "Add CORS headers to responses",
      kind: Kind::Response,
    }
  }

  fn on_response(&self, _request: &Request, response: &mut Response) {
    println!("Setting access control allow origin");
    response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
    response.set_header(Header::new(
      "Access-Control-Allow-Methods",
      "POST, GET, PATCH, OPTIONS",
    ));
    response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
    response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
  }
}

#[get("/")]
fn index() -> &'static str {
  "Hello there. This is a server response :D"
}

pub fn main() {
  rocket::ignite()
    .mount("/", routes![index])
    .attach(CORS)
    .launch();
}

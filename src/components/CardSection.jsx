import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CardSection = () => {
  return (
    <section id="card-section" style={{ marginTop: "5%" }}>
      <Container>
        <h2 className="text-center mb-4 text-success">Discover Our Platform</h2>
        <Row className="align-items-center">
          {/* image 1 */}
          <Col lg={6} md={12} className="mb-4 order-md-1">
            <img
              src="/images/support-farmers.png"
              alt="Support Local Farmers"
              className="img-responsive rounded"
              style={{ width: "100%", height: "300px" }} // CSS for image height
            />
          </Col>

          {/* content 1 */}
          <Col lg={6} md={12} className="mb-4 order-md-2">
            <div className="p-4 bg-light rounded" style={{ height: "100%" }}> {/* CSS for card height */}
              <h3 className="text-success">Support Local Farmers</h3>
              <p>
                Experience the joy of supporting local farmers and savoring the
                freshest, most flavorful foods directly from their fields.
                Celebrate the rich tapestry of agricultural communities and
                enjoy the true essence of farm-to-table goodness.
              </p>
            </div>
          </Col>

          {/* image 2 */}
          <Col lg={6} md={12} className="mb-4 order-md-4">
            <img
              src="/images/sustainable-agriculture.png"
              alt="Sustainable Agriculture"
              className="img-fluid rounded"
              style={{ width: "100%", height: "300px" }} // CSS for image height
            />
          </Col>

          {/* content 2 */}
          <Col lg={6} md={12} className="mb-4 order-md-3">
            <div className="p-4 bg-light rounded" style={{ height: "100%" }}> {/* CSS for card height */}
              <h3 className="text-success">Sustainable Agriculture</h3>
              <p>
                Discover a world of sustainable agriculture, where farming
                practices prioritize environmental stewardship and long-term
                viability. Join us in empowering communities and embracing a
                more eco-friendly approach to food production.
              </p>
            </div>
          </Col>

          {/* image 3 */}
          <Col lg={6} md={12} className="mb-4 order-md-5">
            <img
              src="/images/farm-fresh.jpg"
              alt="Farm-Fresh Abundance"
              className="img-fluid rounded"
              style={{ width: "100%", height: "300px" }} // CSS for image height
            />
          </Col>

          {/* content 3 */}
          <Col lg={6} md={12} className="mb-4 order-md-last">
            <div className="p-4 bg-light rounded" style={{ height: "100%" }}> {/* CSS for card height */}
              <h3 className="text-success">Farm-Fresh Abundance</h3>
              <p>
                Welcome to our platform! Say goodbye to intermediaries and hello
                to farm-fresh goodness delivered straight from village farms to
                your table. Experience culinary delight as you explore a diverse
                selection of the freshest produce available.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CardSection;

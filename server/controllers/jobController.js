
const getJobs = async (req, res) => {
  try {
    const { q, country, seniority } = req.query;

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (country) params.set("country", country);
    if (seniority) params.set("seniority", seniority);

    params.set("sort", "recent");

    const url = `https://himalayas.app/jobs/api/search?${params.toString()}`;

    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "The job provider is temporarily unavailable.",
      });
    }

    const data = await response.json();

    return res.status(200).json({
      success: true,
      totalCount: data.totalCount ?? 0,
      jobs: data.jobs ?? [],
    });
  } catch (error) {
    console.error("Job search error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs. Please try again later.",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search the provider's current results for this job ID.
    const response = await fetch(
      "https://himalayas.app/jobs/api/search?sort=recent",
      { signal: AbortSignal.timeout(15000) }
    );

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "The job provider is temporarily unavailable.",
      });
    }

    const data = await response.json();
    const jobs = data.jobs ?? [];

    const job = jobs.find(
      (item) => String(item.id) === String(id)
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found in the current results.",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job details.",
    });
  }
};

export { getJobs, getJobById };

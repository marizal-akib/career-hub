import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localstorage";
import { useEffect, useState } from "react";
import { BiFilterAlt } from 'react-icons/bi';

const AppliedJobs = () => {
  const jobs = useLoaderData();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);

  const handleJobsFilter = filter =>{
    if(filter === "all"){
        setDisplayedJobs(appliedJobs);
    }
    else if (filter === "remote"){
        const remoteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Remote')
        setDisplayedJobs(remoteJobs);
    }
    else if(filter === 'onsite'){
        const onsiteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Onsite')
        setDisplayedJobs(onsiteJobs)
    }
  }



  useEffect(() => {
    const storedJobIds = getStoredJobApplication();
    if (jobs.length > 0) {
      // const jobApplied = jobs.filter(job => storedJobIds.includes(job.id))

      const jobApplied = [];
      for (const id of storedJobIds) {
        const job = jobs.find((job) => job.id === id);
        if (job) {
          jobApplied.push(job);
        }
      }

      setAppliedJobs(jobApplied);
      setDisplayedJobs(jobApplied);

      // console.log(jobs,storedJobIds,jobApplied);
    }
  }, [jobs]);
  return (
    <div>
      <h2>Jobs I Applied : {appliedJobs.length}</h2>
      <details className="dropdown mb-32">
        <summary className="m-1 btn"><BiFilterAlt></BiFilterAlt>Filter</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li onClick={() => handleJobsFilter('all')}>
            <a>All</a>
          </li>
          <li onClick={() => handleJobsFilter('remote')}>
            <a>Remote</a>
          </li>
          <li onClick={() => handleJobsFilter('onsite')}>
            <a>Onsite</a>
          </li>
        </ul>
      </details>

      <ul>
        {displayedJobs.map((job) => (
          <li key={job.id}>
            <span>
              {job.job_title}, {job.company_name}, {job.remote_or_onsite}.
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;

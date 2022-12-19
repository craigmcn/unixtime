import React, { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faRedo, faCopy } from '@fortawesome/pro-light-svg-icons';
import { DOCUMENT_TITLE, LONG_DATE, RFC_2822, SHORT_DATE, UTC } from '../../lib/constants';
import { IConversion } from '../../lib/types';
import Alert from '../Shared/Alert';
import Section from '../Shared/Section';
import Button from '../Shared/Button';
import useCopyToClipboard from '../../lib/hooks/useCopyToClipboard';
import { getRequestUrl } from '../../lib/functions';

interface IResultProps {
  data: IConversion;
}

const Result = ({ data }: IResultProps) => {
  const { momentDate, time, timezone, error, warning, title } = data;
  const repeatUrl = getRequestUrl({time, timezone, momentDate});

  const [, copy] = useCopyToClipboard();
  const handleCopy = useCallback(() => {
    copy(repeatUrl);
  }, [repeatUrl, copy]);

  useEffect(() => {
    const documentTime = (!timezone || timezone === UTC) ? momentDate.utc() : momentDate.tz(timezone);
    document.title = documentTime.format(LONG_DATE) + ' - ' + DOCUMENT_TITLE;
  }, [momentDate, timezone]);

  return (
    <Section className="border border-gray-400 dark:border-gray-600 rounded">
      <div className={ `p-4 bg-gray-100 rounded rounded-b-none border-b border-gray-400
        dark:text-white dark:bg-gray-800 dark:border-gray-600` }>
        <h3 id="results-title" className="text-xl">{title}</h3>
      </div>

      <div className="p-4">
        {(error || warning) && (
          <Alert type={ error ? 'error' : 'warning' }>
            {error || warning}
          </Alert>
        )}
        <dl id="results">
          <dt className="font-bold">
            Timestamp
            <a
              className={ `ml-1 text-primary dark:text-primary-inverse rounded
                hover:text-primary-dark dark:hover:text-primary-inverse-active
                focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-inverse
                focus:border-transparent` }
              href="https://en.wikipedia.org/wiki/Unix_time"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={ faCircleInfo } />
              <span className="sr-only">info</span>
            </a>
          </dt>
          <dd>{momentDate?.unix()}</dd>
          <dt className="font-bold mt-2">
            Coordinated Universal Time
            <a
              className={ `ml-2 text-primary dark:text-primary-inverse rounded
                hover:text-primary-dark dark:hover:text-primary-inverse-active hover:underline
                focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-inverse
                focus:border-transparent` }
              href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time"
              target="_blank"
              rel="noreferrer"
            >
              UTC
            </a>
          </dt>
          <dd id="results-utc">
            {momentDate?.utc().format(LONG_DATE)}
            <br />
            {momentDate?.utc().format(SHORT_DATE)}
          </dd>

          {timezone && timezone !== UTC && (
            <>
              <dt className="font-bold">{timezone}</dt>
              <dd id="results-timezone">
                {momentDate?.tz(timezone).format(LONG_DATE)}
                <br />
                {momentDate?.format(SHORT_DATE)}
              </dd>
            </>
          )}

          <dt className="font-bold mt-2">ISO 8601</dt>
          <dd>{momentDate?.toISOString(true)}</dd>
          <dt className="font-bold mt-2">RFC 2822</dt>
          <dd>{momentDate?.format(RFC_2822)}</dd>
        </dl>

        <div className="flex gap-1 mt-4">
          <Button
            className={ `text-sm text-slate-600 border-slate-400 hover:text-slate-800 hover:border-slate-600
              dark:text-slate-400 dark:border-slate-600 dark:hover:text-slate-200 dark:hover:border-slate-400
              focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-inverse
              focus:border-transparent` }
            href={ repeatUrl }
            title="Repeat this request"
          >
            <FontAwesomeIcon icon={ faRedo } className="mr-1" />
            Repeat
          </Button>

          {navigator?.clipboard && (
            <Button
              className={ `text-sm text-slate-600 border-slate-400 hover:text-slate-800 hover:border-slate-600
                dark:text-slate-400 dark:border-slate-600 dark:hover:text-slate-200 dark:hover:border-slate-400
                focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-inverse
                focus:border-transparent` }
              title={ `Copy request ${repeatUrl}` }
              onClick={ handleCopy }
            >
              <FontAwesomeIcon icon={ faCopy } className="mr-1" />
              Copy <span className="sr-only">{`${repeatUrl}`}</span>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );

};

export default Result;
